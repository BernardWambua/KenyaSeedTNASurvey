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

class SkillProficiency(models.Model):
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

class TrainingMaterialPreference(models.Model):
    MATERIAL_TYPE_CHOICES = [
        ('handouts', 'Handouts'),
        ('digital', 'Digital copies (e.g. PDFs, ebooks)'),
        ('videos', 'Videos'),
        ('audio', 'Audio recordings'),
    ]
    name = models.CharField(max_length=30, choices=MATERIAL_TYPE_CHOICES, unique=True)

    def __str__(self):
        return self.get_name_display()
    
class Questionnaire(models.Model):
    TRAINING_EFFECTIVENESS_CHOICES = [
        ('very_effective', 'Very effective'),
        ('somewhat_effective', 'Somewhat effective'),
        ('not_very_effective', 'Not very effective'),
        ('not_at_all_effective', 'Not at all effective'),
    ]
    TRAINING_METHOD_CHOICES = [
        ('classroom', 'Instructor-led classroom training'),
        ('selfpaced', 'Self-paced online courses'),
        ('webinar', 'Webinars'),
        ('onthejob', 'On-the-job training'),
    ]
    TRAINING_LOCATION_CHOICES = [
        ('onsite', 'On-site (At your workstation)'),
        ('offsite', 'Off-site (away from your workstation)'),
        ('hybrid', 'Hybrid (both on-site and off-site)'),
    ]
    name = models.CharField(max_length=100, null=True, blank=True)
    staffno = models.CharField(max_length=100, unique=True)
    gender = models.ForeignKey(Gender, on_delete=models.CASCADE)
    agegroup = models.ForeignKey(AgeGroup, on_delete=models.CASCADE)
    serviceagegroup = models.ForeignKey(ServiceAgeGroup, on_delete=models.CASCADE)
    responsibilitylevel = models.ForeignKey(ResponsibilityLevel, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    division = models.ForeignKey(Division, on_delete=models.CASCADE)
    jobfunction = models.ForeignKey(JobFunction, on_delete=models.CASCADE)
    traininglocation = models.CharField(max_length=30, choices=TRAINING_LOCATION_CHOICES, null=True, blank=True)
    training_method_preference = models.CharField(max_length=30, choices=TRAINING_METHOD_CHOICES, null=True, blank=True)
    training_effectiveness = models.CharField(
        max_length=30,
        choices=TRAINING_EFFECTIVENESS_CHOICES,
        null=True,
        blank=True
    )
    improvement_suggestions = models.TextField(
        null=True,
        blank=True,
        help_text="What improvements do you suggest to make the training programs more effective?"
    )
    created_at = models.DateTimeField(auto_now_add=True)  
    
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
    
class QuestionnaireTrainingMaterialPreference(models.Model):
    questionnaire = models.ForeignKey(Questionnaire, on_delete=models.CASCADE, related_name='training_material_preferences')
    material_preference = models.ForeignKey(TrainingMaterialPreference, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.questionnaire} - {self.material_preference.get_name_display()}"
    
class TrainingImportance(models.Model):
    TRAINING_TYPE_CHOICES = [
        ('technical', 'Technical training'),
        ('soft', 'Soft skills training'),
        ('compliance', 'Compliance training'),
        ('leadership', 'Leadership training'),
    ]
    questionnaire = models.ForeignKey(Questionnaire, on_delete=models.CASCADE, related_name='training_importance_entries')
    training_type = models.CharField(max_length=20, choices=TRAINING_TYPE_CHOICES)

    def __str__(self):
        return f"{self.questionnaire} - {self.get_training_type_display()}"
