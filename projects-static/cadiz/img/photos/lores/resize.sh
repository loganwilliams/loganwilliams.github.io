#!/bin/bash

for i in *.jpg; do
    printf "Resize $i\n"
    mogrify "$i" -resize 1600x1600 -quality 85 "$i"
done