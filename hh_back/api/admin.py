from django.contrib import admin
from .models import Company, Vacancy,User,UserAndVacancy
# Register your models here.

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('name','password')
@admin.register(UserAndVacancy)
class UserAndVacancyAdmin(admin.ModelAdmin):
    list_display = ('user_id','vacancy_id')

@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'company', 'description','direction')
