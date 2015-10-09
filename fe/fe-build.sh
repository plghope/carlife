rm -fR output
rm code.tar.gz
fisp release -cumpd output

tar zcvf code.tar.gz ./output

