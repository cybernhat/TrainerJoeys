from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField, IntegerField, DecimalField
from wtforms.validators import DataRequired, URL, Optional, NumberRange


class ProductForm(FlaskForm):
    img_url = StringField("Image URL", validators=[DataRequired(), URL(message="Invalid URL")])
    ability = StringField("Ability", validators=[DataRequired()])
    item = StringField("Item", validators=[Optional()])
    nature = StringField("Nature", validators=[DataRequired()])
    game = StringField("Game", validators=[DataRequired()])
    shiny = BooleanField("Shiny", validators=[DataRequired()])
    generation = IntegerField(
        "Generation", validators=[DataRequired(), NumberRange(min=1, max=9)]
    )
    quantity = IntegerField("Quantity", validators=[DataRequired()])
    price = DecimalField("Price", validators=[DataRequired()], places=2)
    submit = SubmitField("Submit")
