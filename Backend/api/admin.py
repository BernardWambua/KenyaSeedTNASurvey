from django.contrib import admin
from .models import Questionnaire, Gender, AgeGroup, ServiceAgeGroup, ResponsibilityLevel, Department, Division,\
    SoftSkill, TechnicalSkill, QuestionnaireSoftSkill, QuestionnaireTechnicalSkill, DeliveryMode, SkillProficiency


# Register your models here.
admin.site.register(Gender)
admin.site.register(AgeGroup)
admin.site.register(ServiceAgeGroup)
admin.site.register(ResponsibilityLevel)
admin.site.register(Department)
admin.site.register(Division)
admin.site.register(SoftSkill)
admin.site.register(TechnicalSkill)
admin.site.register(DeliveryMode)
admin.site.register(SkillProficiency)

class QuestionnaireSoftSkillInline(admin.TabularInline):
    model = QuestionnaireSoftSkill
    extra = 1

class QuestionnaireTechnicalSkillInline(admin.TabularInline):
    model = QuestionnaireTechnicalSkill
    extra = 1

@admin.register(Questionnaire)
class QuestionnaireAdmin(admin.ModelAdmin):
    inlines = [QuestionnaireSoftSkillInline, QuestionnaireTechnicalSkillInline]

