#!/bin/bash

export TMPDIR=.

for T in chapter inproceedings thesis article techreport mastersthesis phdthesis incollection misc; do
  bibtool -- select{@$T} autolab.bib -o $T.bib
  bibtex2html -r -d -revkeys -nodoc $T.bib 
done