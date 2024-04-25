from django.urls import path
from . import views
from .serializers import RegistrationAPIView
from .views import VacancyList, VacancyDetail
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('companies/', views.get_companies),
    path('companies/<int:company_id>', views.get_company),
    path('companies/<int:company_id>/vacancies', views.vacancies_by_company),
    path('vacancies/add', views.addVacancyToUser),
    path('vacancies/', VacancyList.as_view()),
    path('uservacancies/', views.getUserVacancies),
    path('vacancies/<int:pk>', VacancyDetail.as_view()),
    path('user/create/', views.create_user, name='create_user'),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', RegistrationAPIView.as_view(), name='registration'),

]
