import glob

def render_new_page(date, image_src, audio_src, description, output):
	files = glob.glob(output + "*.html")

	maxnum = 0

	for file in files:
		try:
			num = int(file[len(output):-5])

			if num > maxnum:
				maxnum = num
		except:
			pass


	page = "<html><head><title>postcard from " + date + "</title>"
	page += '''<style>

	body {
		background-color: black;
		font-family: "Helvetica Neue", Helvetica, Arial
	}

	.image {
		margin: 0 auto;
		width: 800px;
	}

	img {
		width: 100%;
		height: auto;
		margin: 0 auto;
	}

	.nav {
		margin-top: 20px;
		width: 800px;
		text-align: center;
		color: white;
	}

	.nav table {
		margin: 0 auto;
	}

	.navitem a {
		color: #666;
	}

	.description {
		color: #AAA;
	}

	.navtrr {
		text-align: right;
		padding-left: 20px;
		width: 125px;
	}

	.navtrl {
		text-align: left;
		padding-right: 20px;
		width: 150px;
	}

	.navdes {
		text-align: center;
	}

	.title {
		color: white;
		text-align: center;
		margin-bottom: 20px;
	}

	.title a{
		color: #AAA;
	}

	</style>
	</head>'''

	page += '''<body>
	<div class="image">
		<div class="title">
			audio + imagery by <a href="http://soundcolorlightspace.tumblr.com">logan williams</a>
		</div>

		<img src="'''

	page += image_src

	page += ''' "/>

		<audio autoplay loop>
			<source src="'''

	page += audio_src

	page += '''" />
		</audio>

	<div class="nav">
		<table>
			<tr>
				<td class="navtrl"><span class="navitem"><a href="'''


	if (maxnum != 0):
		page += str(maxnum) + ".html"
	else:
		page += "#"

	page += '''">previous postcard</a></span></td>
				<td class="navdes"><span class="description">'''

	page += description + " " + date + "."

	page += '''</span></td>
					<td class="navtrr"><span class="navitem"><a href="'''

	page += str(maxnum+2) + ".html"

	page += '''">next postcard</a></span></td>
				</tr>
			</table>
		</div>

		</div>


	</body>
	</html>'''

	f = open(output + str(maxnum+1) + '.html','w')
	f.write(page)
	f.close()


#render_new_page("may 10", "images/1.jpg", "audio/1.mp3", "rainstorm on cambridge street.", "")
