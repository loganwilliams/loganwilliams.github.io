precision mediump float;
precision mediump sampler2DArray;
precision mediump sampler2D;

varying vec2 vUv;

uniform sampler2DArray u_data;

uniform sampler2D u_maxdata;
uniform sampler2D u_cmdata;
uniform sampler2D u_seenbirds;
uniform sampler2D u_recognizedbirds;
uniform int u_seenbirdscount;
uniform int u_recognizedbirdscount;
uniform vec2 mouse;

uniform vec3 u_size;

uniform lowp int u_mode;
uniform lowp int u_normalize;
uniform lowp int u_cursor;

vec2 convert_to_lng_lat(vec2 uv) {
    float lat = (2.0 * atan(exp((1.0 - 2.0 * uv.y) * 3.1415926535897932384626433832795)) - 3.1415926535897932384626433832795 / 2.0) * 180.0 / 3.1415926535897932384626433832795;
    float lon = uv.x * 360.0 - 180.0;
    return vec2(lon, lat);
}

vec2 convert_to_uv(vec2 lng_lat) {
    float x = (lng_lat.x + 180.0) / 360.0;
    float y = 1.0 - (log(tan(3.1415926535897932384626433832795 / 4.0 + radians(lng_lat.y) / 2.0)) / 3.1415926535897932384626433832795 + 1.0) / 2.0;
    return vec2(x, y);
}

vec2 invert_lambert(vec2 uv) {
    // Convert the mouse position to lat, lng (Lambert Equal Area inverse)

    float lng = uv.x * 360.0 - 180.0;
    float lat = asin(-(2.0 * uv.y - 1.0)) * 180.0 / 3.1415926535897932384626433832795;
    return vec2(lng, lat);
}

vec2 invert_mollweide(vec2 uv) {
    // Convert the mouse position to lat, lng (Mollweide inverse)

    float x = uv.x * 2.8284271247 * 2.0 - 2.8284271247;
    float y = (1.0 - uv.y) * 1.4142135624 * 2.0 - 1.4142135624;

    float theta = asin(y / sqrt(2.0));
    float phi = asin((2.0 * theta + sin(2.0 * theta)) / 3.1415926535897932384626433832795);

    float lat = phi / 3.1415926535897932384626433832795 * 180.0;
    float lng = 3.1415926535897932384626433832795 * x / (2.0 * sqrt(2.0) * cos(theta)) * (180.0 / 3.1415926535897932384626433832795);

    return vec2(lng, lat);
}

vec2 equalEarthInverse(vec2 xy) {
    // Constants for the Equal Earth inverse projection function
    const float A1 = 1.340264;
    const float A2 = -0.081106;
    const float A3 = 0.000893;
    const float A4 = 0.003796;
    const float M = sqrt(3.0) / 2.0;
    const float PI = 3.1415926535897932384626433832795;

    // Scale from 0-1 to actual projection coordinates
    // These are hand-tweaked magic numbers for lining up the projection to D3
    xy = xy * 2.0 - 1.0;
    float x = xy.x * M * 0.995 * PI;
    float y = -0.42 * xy.y * PI;

    // Calculate theta using Newton's method
    float theta = y;
    float delta;
    for(int i = 0; i < 12; i++) {
        float theta2 = theta * theta;
        float theta4 = theta2 * theta2;
        float theta6 = theta4 * theta2;

        float delta = (theta * (A1 + A2 * theta2 + A3 * theta6 + A4 * theta4 * theta4) - y) / (A1 + 3.0 * A2 * theta2 + 7.0 * A3 * theta6 + 9.0 * A4 * theta4 * theta4);

        theta = theta - delta;

        if(abs(delta) < 1e-6)
            break;
    }

    // Calculate longitude and latitude
    float theta2 = theta * theta;
    float theta4 = theta2 * theta2;
    float theta6 = theta4 * theta2;

    float beta = asin(2.0 * sin(theta) / sqrt(3.0));
    float lambda = x * sqrt(3.0) * (A1 + 3.0 * A2 * theta2 + 7.0 * A3 * theta6 + 9.0 * A4 * theta4 * theta4) / (2.0 * cos(theta));

    // Convert to degrees and normalize
    float lon = degrees(lambda);
    float lat = degrees(beta);

    // Normalize longitude to [-180, 180]
    lon = mod(lon + 180.0, 360.0) - 180.0;

    return vec2(lon, lat);
}

void main() {
    float count = 0.0;
    vec4 color0;

    int i, ii;
    int packed_size = int(u_size.z);
    lowp int raw, raw_w;
    lowp int shifted;
    float extracted, extracted_w;

    vec2 inv = equalEarthInverse(vUv);

    // Early return with transparent color if bounds exceed the Equal Earth projection
    if(((inv.x < 0.0) && (vUv.x > 0.5)) || ((inv.x > 0.0) && (vUv.x < 0.5))) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        return;
    }

    vec2 uv = convert_to_uv(inv);
    vec2 ms = convert_to_uv(equalEarthInverse(mouse));

    if(u_mode > 0) {
        int layer = (u_mode - 1) / 8;
        int ii = (u_mode - 1) - layer * 8;

        raw = int(255.0 * texture(u_data, vec3(1.0 - uv.y, uv.x, layer)).r);
        shifted = (raw >> ii) & 0x01;

        if(shifted == 0) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
            return;
        }

        gl_FragColor = vec4(float(shifted) * 0.9, float(shifted) * 0.58, float(shifted) * 0.9, 1.0);
        return;
    }

    // Loop over each layer of the packed data. We want to color each pixel based on the number of species
    // (packed bits) that are present at that pixel and also at the mouse position. We do this with a weighted
    // sum of the unpacked values.
    for(i = 0; i < packed_size; i += 1) {
        // Read the data from the texture for this u,v position and convert to int (it should be uint8)
        raw = int(255.0 * texture(u_data, vec3(1.0 - uv.y, uv.x, i)).r);

        if(u_mode < -2) {
            // Read the weight from the recognized birds texture
            raw_w = int(255.0 * texelFetch(u_recognizedbirds, ivec2(i, 0), 0).r);
        } else if(u_mode < -1) {
            // Read the weight from the seen birds texture
            raw_w = 0xFF - int(255.0 * texelFetch(u_seenbirds, ivec2(i, 0), 0).r);
        } else if(u_mode < 0) {
            // Read the weight from the seen birds texture
            raw_w = int(255.0 * texelFetch(u_seenbirds, ivec2(i, 0), 0).r);
        } else {
            // Read the data from the texture for the mouse uniform position and convert to int
            raw_w = int(255.0 * texture(u_data, vec3(ms.y, ms.x, i)).r);
        }

        // Each byte contains 8 packed species, so we accumulate each one
        for(ii = 0; ii < 8; ii += 1) {
            // Extract the relevant bits
            extracted = float((raw >> ii) & 1);
            extracted_w = float((raw_w >> ii) & 1);

            // Accumulate the color. Only if a species is present at the u,v, position and at
            // the mouse position will it be accumulated
            count += extracted * extracted_w;
        }
    }

    vec4 maxvec;

    if(u_normalize > 0) {
        maxvec = texture2D(u_maxdata, vec2(uv.x, uv.y));
    } else {
        maxvec = texture2D(u_maxdata, vec2(ms.x, 1.0 - ms.y));
    }

    int maxr = int(255.0 * maxvec.r);
    int maxg = int(255.0 * maxvec.g);
    float maxcountraw = float((maxr << 8) + maxg);

    float maxcount = max(10.0, maxcountraw);

    if(u_mode < 0 && u_normalize == 0) {
        if(u_mode < -2) {
            // Since we can't compute the real maximum over the whole map, we take the total birds seen times a factor
            maxcount = maxcountraw = float(u_recognizedbirdscount) * 0.6;
        } else if(u_mode < -1) {
            // a random guess
            maxcount = maxcountraw = 900.0;
        } else {
            // Since we can't compute the real maximum over the whole map, we take the total birds seen times a factor
            maxcount = maxcountraw = float(u_seenbirdscount) * 0.5;
        }
    }

    float ratio = count * (1.0 / maxcount);

    // Lookup in colormap
    color0 = texture2D(u_cmdata, vec2(pow(ratio, 0.7), 0.5));
    color0.a = max(0.0, min(1.0, maxcountraw / 5.0));

    if(ratio < 0.001 || maxcountraw < 1.0) {
        color0 = vec4(0.0, 0.0, 0.0, 0.0);
    }

    // Highlight the mouse position
    if(u_cursor > 0) {
        if(abs(vUv.x - mouse.x) < 0.003 && abs(vUv.y - (1.0 - mouse.y)) < 0.006) {
            if(abs(vUv.x - mouse.x) < 0.001 && abs(vUv.y - (1.0 - mouse.y)) < 0.002) {
            } else {
                color0 = vec4(0.8, 0.3, 0.8, 1.0);
            }
        }
    }

    // Display the color
    gl_FragColor = color0;
    return;
}