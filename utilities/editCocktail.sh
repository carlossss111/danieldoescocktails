#!/bin/bash
# 04/07/21 Daniel Robinson
# Loads an already existing table cell and allows it to be updated in vi

#properties
if [ ! -r "./properties.php" ];then
	echo -e "Properties.php does not exist...\nSee /README.md"
	exit 1
fi
DB_USER=$(head -n 4 ./properties.php | tail -n 1)
DB=$(head -n 5 ./properties.php | tail -n 1)

#inputs
echo -n "Here cocktail rows can be updated. Enter password to start: "
read -s password
read -p $'\n'"Which cocktail (name) will be updated? " row
read -p "Which part of the row will be updated? ['name'|'image'|'ingredients'|'description'|'date'] " column

#input validation
if [[ "|name|image|ingredients|description|date|" != *"|$column|"* ]];then
	echo "Invalid column entered."
	exit 1
fi

#get current value (note to remember: SQL SELECT is case-insensitive)
edit=$(echo "SELECT $column FROM cocktail WHERE name = \"$row\";" | mysql -u $DB_USER -p$password $DB)
edit=$(echo $edit | sed "s/$column //g")
if [ -z "$edit" ];then
	echo "The search yielded no results, nothing to update!"
	exit 0
fi

#edit a buffer in vi(m)
echo $edit > /tmp/cocktailEdit
vi /tmp/cocktailEdit
newEdit=$(cat /tmp/cocktailEdit)
rm /tmp/cocktailEdit

#update table with new edit
mysql -u $DB_USER -p$password $DB << EOF
	UPDATE cocktail SET $column = "$newEdit" WHERE name = "$row";
EOF
echo "UPDATE executed!"

exit 0
