from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField, IntegerField, DecimalField, TextAreaField
from wtforms.validators import DataRequired, Optional, NumberRange

class ReviewForm(FlaskForm):
    description = TextAreaField("Description", validators=[DataRequired()])
    thumbs_up = BooleanField("Thumbs Up")
    thumbs_down = BooleanField("Thumbs Down")
    submit = SubmitField("Submit")

    def validate(self):
        # Call the parent class's validate method to run all default validators
        if not super().validate():
            return False

        # Check if both thumbs_up and thumbs_down are selected
        if self.thumbs_up.data and self.thumbs_down.data:
            raise ValidationError("You cannot select both thumbs up and thumbs down.")

        # Ensure at least one of thumbs_up or thumbs_down is selected
        if not self.thumbs_up.data and not self.thumbs_down.data:
            raise ValidationError("You must select either thumbs up or thumbs down.")

        return True
