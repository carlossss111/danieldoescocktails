#!/bin/bash
# 04/07/21 Daniel Robinson
#Inserts a row to the cocktail database

#paths and properties
if [ ! -r "./properties.txt" ];then
	echo -e "Properties.txt does no exist...\nSee /README.md"
	exit 1
fi
CSV_PATH=$(head -n 1 ./properties.txt)
DB_USER=$(head -n 2 ./properties.txt | tail -n 1)
DB=$(tail -n 1 ./properties.txt)

#inputs
echo -e "Here a new cocktail can be inserted into the table, press CTRL+C to exit at any time.\n"
read -p "Enter a custom Id (or leave blank for auto-increment):"$'\n' id
read -p "Enter name:"$'\n' name
read -p "Enter image path:"$'\n' image

echo "Enter each ingredient, marking the final ingredient with a dollar sign '$' after the last character."
while [ "$(echo "$ingredientInput" | tail -c 2 | head -c 1)" != "$" ];do
	read ingredientInput
	if [ "$(echo "$ingredientInput" | wc -c)" -gt 2  ];then
		if [ -z "$ingredients" ];then
			ingredients=$ingredientInput
		else
			ingredients=$ingredients/$ingredientInput
		fi
	fi
done
ingredients=$(echo $ingredients | sed "s/$//g")

read -p "Enter description:"$'\n' description
read -p "Enter date:"$'\n' date

#confirm
clear
if [ -n "$id" ];then
	echo -e "\n[ID: ] \"$id\"\n\n"
fi	
echo -e "[NAME:] \"$name\"\n"
echo -e "[IMAGE PATH:] \"$image\"\n"
echo -e "[INGREDIENTS:] \n\"-$(echo $ingredients | sed "s/\//\n-/g")\"\n"
echo -e "[DESCRIPTION:] \n\"$description\"\n"
echo -e "[DATE:] \"$date\"\n"

echo "This will be added to the live database, check it carefully."
read -p "Send to database? [Y/n]" answer

if [ "$answer" != "Y" ] && [ "$answer" != "y" ];then
	echo "Quitting without sending."
	exit 0
fi

#get id if not entered
echo -e "\nPlease enter passwords to both \"$(whoami)\" and to the mySQL database:"
if [ -z "$id" ];then
	id=$(sudo tail -n 1 "$CSV_PATH" | head -c 1)
	id=$((id+1))
fi

#update database with a heredoc
mysql -u $DB_USER -p $DB << EOF
	INSERT INTO cocktail VALUES ($id,"$name","$image","$ingredients","$description","$date");
EOF
echo "INSERT executed!"

exit 0
