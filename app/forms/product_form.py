from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField, IntegerField, DecimalField
from wtforms.validators import DataRequired, URL, Optional, NumberRange


class ProductForm(FlaskForm):
    ability = StringField("Ability", validators=[DataRequired()])
    item = StringField("Item", validators=[Optional()])
    nature = StringField("Nature", validators=[DataRequired()])
    game = StringField("Game", validators=[DataRequired()])
    shiny = BooleanField("Shiny", validators=[Optional()])
    generation = IntegerField(
        "Generation", validators=[DataRequired(), NumberRange(min=1, max=9)]
    )
    quantity = IntegerField("Quantity", validators=[DataRequired()])
    price = DecimalField("Price", validators=[DataRequired()], places=2)
    description = StringField("Description", validators=[DataRequired()])

    # New fields for moves
    move_1 = StringField("Move 1", validators=[DataRequired()])
    move_2 = StringField("Move 2", validators=[Optional()])
    move_3 = StringField("Move 3", validators=[Optional()])
    move_4 = StringField("Move 4", validators=[Optional()])

    submit = SubmitField("Submit")
