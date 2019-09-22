#!/bin/bash

csso rampt.css rampt.min.css
uglifyjs -o rampt.min.js rampt.js

cd ..

include_code rampt.min.html
