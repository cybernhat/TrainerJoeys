from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, URL, Optional, NumberRange

class ProductImageForm(FlaskForm):
    img_url = StringField("Image Url", validators=[DataRequired()])
    filename = StringField("File Name", validators=[DataRequired()])
