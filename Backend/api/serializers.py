from rest_framework import serializers
from .models import Questionnaire, Gender, AgeGroup, ServiceAgeGroup, ResponsibilityLevel, Department, Division, \
    SoftSkill, TechnicalSkill, QuestionnaireSoftSkill, QuestionnaireTechnicalSkill, DeliveryMode, SkillProficiency, \
    JobFunction, TrainingImportance, QuestionnaireTrainingMaterialPreference, TrainingMaterialPreference

class GenderSerializer(serializers.ModelSerializer):
    gender_name = serializers.CharField(source='name', read_only=True)
    class Meta:
        model = Gender
        fields = '__all__'

class AgeGroupSerializer(serializers.ModelSerializer):
    agegroup_name = serializers.CharField(source='name', read_only=True)
    class Meta:
        model = AgeGroup
        fields = '__all__'

class ServiceAgeGroupSerializer(serializers.ModelSerializer):
    serviceagegroup_name = serializers.CharField(source='name', read_only=True)
    class Meta:
        model = ServiceAgeGroup
        fields = '__all__'

class ResponsibilityLevelSerializer(serializers.ModelSerializer):
    responsibilitylevel_name = serializers.CharField(source='name', read_only=True)
    class Meta:
        model = ResponsibilityLevel          
        fields = '__all__'

class DepartmentSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='name', read_only=True)
    class Meta:
        model = Department
        fields = '__all__'          

class DivisionSerializer(serializers.ModelSerializer):
    dvision_name = serializers.CharField(source='name', read_only=True)
    class Meta:
        model = Division
        fields = '__all__'

class DeliveryModeSerializer(serializers.ModelSerializer):
    deliverymode_name = serializers.CharField(source='name', read_only=True)
    class Meta:
        model = DeliveryMode
        fields = '__all__'
        
class SoftSkillSerializer(serializers.ModelSerializer):
    softskill_name = serializers.CharField(source='name', read_only=True)
    class Meta:
        model = SoftSkill
        fields = '__all__'

class TechnicalSkillSerializer(serializers.ModelSerializer):
    technicalskill_name = serializers.CharField(source='name', read_only=True)
    class Meta:
        model = TechnicalSkill
        fields = '__all__'
        
class QuestionnaireSoftSkillSerializer(serializers.ModelSerializer):
    softskill_name = serializers.CharField(source='softskill.name', read_only=True)
    skillproficiency_name = serializers.CharField(source='skillproficiency.name', read_only=True)
    deliverymode_name = serializers.CharField(source='modeofdelivery.name', read_only=True)
    class Meta:
        model = QuestionnaireSoftSkill
        fields = '__all__'
        
class QuestionnaireTechnicalSkillSerializer(serializers.ModelSerializer):
    technicalskill_name = serializers.CharField(source='technicalskill.name', read_only=True)
    skillproficiency_name = serializers.CharField(source='skillproficiency.name', read_only=True)
    deliverymode_name = serializers.CharField(source='modeofdelivery.name', read_only=True)
    class Meta:
        model = QuestionnaireTechnicalSkill
        fields = '__all__'
 
class SkillProficiencySerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillProficiency
        fields = '__all__'
            
class JobFunctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobFunction
        fields = '__all__'

class TrainingMaterialPreferenceSerializer(serializers.ModelSerializer):
    name_display = serializers.CharField(source='get_name_display', read_only=True)
    class Meta:
        model = TrainingMaterialPreference
        fields = '__all__'

class TrainingImportanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingImportance
        fields = '__all__'
        
class QuestionnaireTrainingMaterialPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionnaireTrainingMaterialPreference
        fields = '__all__'

class QuestionnaireSerializer(serializers.ModelSerializer):
    softskill_entries = QuestionnaireSoftSkillSerializer(many=True, read_only=True)
    technicalskill_entries = QuestionnaireTechnicalSkillSerializer(many=True, read_only=True)
    gender_name = serializers.CharField(source='gender.name', read_only=True)
    agegroup_name = serializers.CharField(source='agegroup.name', read_only=True)
    serviceagegroup_name = serializers.CharField(source='serviceagegroup.name', read_only=True) 
    region_name = serializers.CharField(source='region.name', read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)
    division_name = serializers.CharField(source='division.name', read_only=True)
    responsibilitylevel_name = serializers.CharField(source='responsibilitylevel.name', read_only=True)
    jobfunction_name = serializers.CharField(source='jobfunction.name', read_only=True)
    
    class Meta:
        model = Questionnaire
        fields = '__all__'
   
    
    
    
    