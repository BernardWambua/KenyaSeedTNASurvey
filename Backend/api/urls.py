from django.urls import path
from .views import QuestionnaireViewSet, GenderViewSet, AgeGroupViewSet,\
        ServiceAgeGroupViewSet,ResponsibilityLevelViewSet, DepartmentViewSet, JobFunctionViewSet, \
        DivisionViewSet, DeliveryModeViewSet, SoftSkillViewSet, TechnicalSkillViewSet, \
        QuestionnaireSoftSkillViewSet, QuestionnaireTechnicalSkillViewSet, SkillProficiencyViewSet, \
        upload_jobfunctions, upload_technicalskills


urlpatterns = [
    path('upload-jobfunctions/', upload_jobfunctions, name='upload_jobfunctions'),
    path('upload-technicalskills/', upload_technicalskills, name='upload_technicalskills'),
    path('questionnaire/', QuestionnaireViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='questionnaire'),
    path('questionnaire/<int:pk>/', QuestionnaireViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    }), name='questionnaire-detail'),
    path('genders/', GenderViewSet.as_view({
        'get': 'list'
    }), name='genders'),
    path('age-groups/', AgeGroupViewSet.as_view({
        'get': 'list'
    }), name='age-groups'), 
    path('service-age-groups/', ServiceAgeGroupViewSet.as_view({
        'get': 'list'
    }), name='service-age-groups'),
    path('responsibility-levels/', ResponsibilityLevelViewSet.as_view({
        'get': 'list'
    }), name='responsibility-levels'),
    path('departments/', DepartmentViewSet.as_view({
        'get': 'list'
    }), name='departments'),
    path('divisions/', DivisionViewSet.as_view({
        'get': 'list'
    }), name='divisions'),
    path('soft-skills/', SoftSkillViewSet.as_view({
        'get': 'list'
    }), name='soft-skills'),
    path('technical-skills/', TechnicalSkillViewSet.as_view({
        'get': 'list'
    }), name='technical-skills'),
    path('questionnaire-soft-skills/', QuestionnaireSoftSkillViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='questionnaire-soft-skills'),
    path('questionnaire-technical-skills/', QuestionnaireTechnicalSkillViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='questionnaire-technical-skills'),
    path('delivery-modes/', DeliveryModeViewSet.as_view({
        'get': 'list'
    }), name='delivery-modes'),
    path('skill-proficiency/', SkillProficiencyViewSet.as_view({
        'get': 'list'
    }), name='skill-proficiency'),
    path('job-functions/', JobFunctionViewSet.as_view({
        'get': 'list'
    }), name='job-functions')
        
]

