from django import forms

class JobFunctionUploadForm(forms.Form):
    file = forms.FileField()
    
class TechnicalSkillsUploadForm(forms.Form):
    file = forms.FileField()