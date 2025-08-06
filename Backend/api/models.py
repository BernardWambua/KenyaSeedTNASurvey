from django.db import models

class Gender(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
class AgeGroup(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class ServiceAgeGroup(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class ResponsibilityLevel(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Department(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Division(models.Model):
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class JobFunction(models.Model):
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    division = models.ForeignKey(Division, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class DeliveryMode(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class SoftSkill(models.Model):
    trained_choices = [
        ('Yes', 'Yes'),
        ('No', 'No'),
    ]
    name = models.CharField(max_length=100)
    responsibilitylevel = models.ForeignKey(ResponsibilityLevel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class TechnicalSkill(models.Model):
    trained_choices = [
        ('Yes', 'Yes'),
        ('No', 'No'),
    ]
    name = models.CharField(max_length=100)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, null=True, blank=True)
    division = models.ForeignKey(Division, on_delete=models.CASCADE, null=True, blank=True)
    jobfunction = models.ForeignKey(JobFunction, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    

class Questionnaire(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    staffno = models.CharField(max_length=100, unique=True)
    gender = models.ForeignKey(Gender, on_delete=models.CASCADE)
    agegroup = models.ForeignKey(AgeGroup, on_delete=models.CASCADE)
    serviceagegroup = models.ForeignKey(ServiceAgeGroup, on_delete=models.CASCADE)
    responsibilitylevel = models.ForeignKey(ResponsibilityLevel, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    division = models.ForeignKey(Division, on_delete=models.CASCADE)
    jobfunction = models.ForeignKey(JobFunction, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class SkillProficiency(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
    
class QuestionnaireSoftSkill(models.Model):
    questionnaire = models.ForeignKey(Questionnaire, on_delete=models.CASCADE, related_name='softskill_entries')
    softskill = models.ForeignKey(SoftSkill, on_delete=models.CASCADE)
    trained = models.CharField(max_length=100, choices=SoftSkill.trained_choices)
    modeofdelivery = models.ForeignKey(DeliveryMode, on_delete=models.CASCADE)
    skillproficiency = models.ForeignKey(SkillProficiency, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.questionnaire} - {self.softskill.name}"

class QuestionnaireTechnicalSkill(models.Model):
    questionnaire = models.ForeignKey(Questionnaire, on_delete=models.CASCADE, related_name='technicalskill_entries')
    technicalskill = models.ForeignKey(TechnicalSkill, on_delete=models.CASCADE)
    trained = models.CharField(max_length=100, choices=TechnicalSkill.trained_choices)
    modeofdelivery = models.ForeignKey(DeliveryMode, on_delete=models.CASCADE)
    skillproficiency = models.ForeignKey(SkillProficiency, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.questionnaire} - {self.technicalskill.name}"