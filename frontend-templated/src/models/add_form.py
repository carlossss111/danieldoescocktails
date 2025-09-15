from wtforms import DateField, FileField, Form, StringField, TextAreaField
from wtforms.validators import DataRequired

class AddCocktailForm(Form):
    name = StringField("Name", validators=[DataRequired()])
    image = FileField("Image File", validators=[DataRequired()])
    ingredients = TextAreaField("Ingredients", validators=[DataRequired()])
    description = TextAreaField("Description", validators=[DataRequired()])
    date = DateField("Date Mixed", validators=[DataRequired()])

