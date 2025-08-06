from rest_framework import viewsets
from .models import Questionnaire, Gender, AgeGroup, ServiceAgeGroup, DeliveryMode,\
    ResponsibilityLevel, Department, Division, SoftSkill, TechnicalSkill, JobFunction, \
    QuestionnaireSoftSkill, QuestionnaireTechnicalSkill, SkillProficiency
from .serializers import QuestionnaireSerializer, GenderSerializer, AgeGroupSerializer, ServiceAgeGroupSerializer, JobFunctionSerializer,\
    DepartmentSerializer, DivisionSerializer, ResponsibilityLevelSerializer, SoftSkillSerializer, TechnicalSkillSerializer,\
        QuestionnaireSoftSkillSerializer, QuestionnaireTechnicalSkillSerializer, DeliveryModeSerializer, SkillProficiencySerializer
import pandas as pd
from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import JobFunctionUploadForm, TechnicalSkillsUploadForm




# Create your views here.
def upload_jobfunctions(request):
    if request.method == 'POST':
        form = JobFunctionUploadForm(request.POST, request.FILES)
        if form.is_valid():
            file = request.FILES['file']
            try:
                # Read the Excel file
                df = pd.read_excel(file)

                # Ensure the required columns are present
                if 'Department' not in df.columns or 'Division' not in df.columns or 'JobFunction' not in df.columns:
                    messages.error(request, "The file must contain 'Department', 'Division' and 'JobFunction' columns.")
                    return redirect('upload_jobfunctions')

                # Process each row
                for _, row in df.iterrows():
                    department_name = row['Department']
                    division_name = row['Division']
                    jobfunction_name = row['JobFunction']
                    
                    # Get the Department object
                    try:
                        department = Department.objects.get(name=department_name)
                    except Department.DoesNotExist:
                        messages.warning(request, f"Department '{department_name}' does not exist. Skipping.")
                        continue

                    # Get the Division object
                    try:
                        division = Division.objects.get(name=division_name)
                    except Division.DoesNotExist:
                        messages.warning(request, f"Division '{division_name}' does not exist. Skipping.")
                        continue

                    # Create or update the JobFunction
                    JobFunction.objects.get_or_create(department=department, division=division, name=jobfunction_name)

                messages.success(request, "JobFunctions uploaded successfully!")
                return redirect('upload_jobfunctions')

            except Exception as e:
                messages.error(request, f"An error occurred: {e}")
                return redirect('upload_jobfunctions')
    else:
        form = JobFunctionUploadForm()

    return render(request, 'upload_jobfunctions.html', {'form': form})

def upload_technicalskills(request):
    if request.method == 'POST':
        form = TechnicalSkillsUploadForm(request.POST, request.FILES)
        if form.is_valid():
            file = request.FILES['file']
            try:
                # Read the Excel file
                df = pd.read_excel(file)

                # Ensure the required columns are present
                if 'Department' not in df.columns or'Division' not in df.columns or 'JobFunction' not in df.columns or 'TechnicalSkill' not in df.columns:
                    messages.error(request, "The file must contain 'Department', 'Division', 'JobFunction' and 'TechnicalSkill' columns.")
                    return redirect('upload_technicalskills')

                # Process each row
                for _, row in df.iterrows():
                    department_name = row['Department']
                    division_name = row['Division']
                    jobfunction_name = row['JobFunction']
                    technicalskill_name = row['TechnicalSkill']

                    # Get the Division object
                    try:
                        department = Department.objects.get(name=department_name)
                    except Department.DoesNotExist:
                        messages.warning(request, f"Department '{department_name}' does not exist. Skipping.")
                        continue
                    try:
                        division = Division.objects.get(name=division_name)
                    except Division.DoesNotExist:
                        messages.warning(request, f"Division '{division_name}' does not exist. Skipping.")
                        continue
                    try:
                        jobfunction = JobFunction.objects.get(name=jobfunction_name, division=division)
                    except JobFunction.DoesNotExist:
                        messages.warning(request, f"JobFunction '{jobfunction_name}' does not exist. Skipping.")
                        continue

                    # Create or update the TechnicalSkill
                    TechnicalSkill.objects.get_or_create(department=department, division=division, jobfunction=jobfunction, name=technicalskill_name)

                messages.success(request, "Technical Skills uploaded successfully!")
                return redirect('upload_technicalskills')

            except Exception as e:
                messages.error(request, f"An error occurred: {e}")
                return redirect('upload_technicalskills')
    else:
        form = TechnicalSkillsUploadForm()

    return render(request, 'upload_technicalskills.html', {'form': form})

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
    # queryset = JobFunction.objects.all()
    serializer_class = JobFunctionSerializer
    def get_queryset(self):
        division_id = self.request.query_params.get('division', None)
        if division_id:
            return JobFunction.objects.filter(division_id=division_id)
        return JobFunction.objects.none()

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




