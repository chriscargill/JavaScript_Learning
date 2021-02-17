from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField, validators
from wtforms.validators import DataRequired, Length, Email, EqualTo

class AddForm(FlaskForm):
    Who = StringField('Who', validators=[DataRequired()])

    What = StringField('What', validators=[DataRequired(), Length(min=3, max=3000)])

    When = StringField('When', validators=[DataRequired()])

    Where = StringField('Where', validators=[DataRequired()])

    Why = StringField('Why', validators=[DataRequired()])

    submit = SubmitField('Let Everyone Know')  