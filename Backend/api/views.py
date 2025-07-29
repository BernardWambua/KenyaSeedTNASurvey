from rest_framework import viewsets
from .models import Questionnaire, Gender, AgeGroup, ServiceAgeGroup, DeliveryMode,\
    ResponsibilityLevel, Department, Division, SoftSkill, TechnicalSkill, JobFunction, \
    QuestionnaireSoftSkill, QuestionnaireTechnicalSkill, SkillProficiency
from .serializers import QuestionnaireSerializer, GenderSerializer, AgeGroupSerializer, ServiceAgeGroupSerializer, JobFunctionSerializer,\
    DepartmentSerializer, DivisionSerializer, ResponsibilityLevelSerializer, SoftSkillSerializer, TechnicalSkillSerializer,\
        QuestionnaireSoftSkillSerializer, QuestionnaireTechnicalSkillSerializer, DeliveryModeSerializer, SkillProficiencySerializer

# Create your views here.
class QuestionnaireViewSet(viewsets.ModelViewSet):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer

class GenderViewSet(viewsets.ModelViewSet):
    queryset = Gender.objects.all()
    serializer_class = GenderSerializer
    
class AgeGroupViewSet(viewsets.ModelViewSet):
    queryset = AgeGroup.objects.all()
    serializer_class = AgeGroupSerializer

class ServiceAgeGroupViewSet(viewsets.ModelViewSet):
    queryset = ServiceAgeGroup.objects.all()
    serializer_class = ServiceAgeGroupSerializer
    
class ResponsibilityLevelViewSet(viewsets.ModelViewSet):
    queryset = ResponsibilityLevel.objects.all()
    serializer_class = ResponsibilityLevelSerializer
    
class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    
class DivisionViewSet(viewsets.ModelViewSet):
    serializer_class = DivisionSerializer

    def get_queryset(self):
        department_id = self.request.query_params.get('department', None)
        if department_id:
            return Division.objects.filter(department_id=department_id)
        return Division.objects.none()
    
class DeliveryModeViewSet(viewsets.ModelViewSet):
    queryset = DeliveryMode.objects.all()
    serializer_class = DeliveryModeSerializer
    
class JobFunctionViewSet(viewsets.ModelViewSet):
    queryset = JobFunction.objects.all()
    serializer_class = JobFunctionSerializer
    
class SkillProficiencyViewSet(viewsets.ModelViewSet):
    queryset = SkillProficiency.objects.all()
    serializer_class = SkillProficiencySerializer

class SoftSkillViewSet(viewsets.ModelViewSet):
    serializer_class = SoftSkillSerializer
    # filter by responsibilitylevel       
    def get_queryset(self):
        responsibilitylevel_id = self.request.query_params.get('responsibilitylevel', None)
        if responsibilitylevel_id:
            return SoftSkill.objects.filter(responsibilitylevel_id=responsibilitylevel_id)
        return SoftSkill.objects.none()
    
class TechnicalSkillViewSet(viewsets.ModelViewSet):
    serializer_class = TechnicalSkillSerializer
    # filter by jobfunction      
    def get_queryset(self):
        jobfunction_id = self.request.query_params.get('jobfunction', None)
        if jobfunction_id:
            return TechnicalSkill.objects.filter(jobfunction_id=jobfunction_id)
        return TechnicalSkill.objects.none()
    

class QuestionnaireSoftSkillViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionnaireSoftSkillSerializer
    
    def get_queryset(self):
        questionnaire_id = self.request.query_params.get('questionnaire', None)
        if questionnaire_id:
            return QuestionnaireSoftSkill.objects.filter(questionnaire_id=questionnaire_id)
        return QuestionnaireSoftSkill.objects.none()
    
class QuestionnaireTechnicalSkillViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionnaireTechnicalSkillSerializer

    def get_queryset(self):
        questionnaire_id = self.request.query_params.get('questionnaire', None)
        if questionnaire_id:
            return QuestionnaireTechnicalSkill.objects.filter(questionnaire_id=questionnaire_id)
        return QuestionnaireTechnicalSkill.objects.none()




