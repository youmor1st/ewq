from django.db import models

# Create your models here.


def companies():
    return Company.objects.all()


def vacancies():
    return Vacancy.objects.all()


class Company(models.Model):
    name = models.CharField(max_length=255)
    class Meta:
        verbose_name = "Company"
        verbose_name_plural = "Companies"


class Vacancy(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    direction = models.TextField()
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Vacancy"
        verbose_name_plural = "Vacancies"

    def __str__(self):
        return f"{self.name}:{self.company}"
    
class User(models.Model):
    name=models.CharField(max_length=25,primary_key=True)
    password=models.CharField(max_length=255)
    vacancies = models.ManyToManyField(Vacancy)
    class Meta:
        verbose_name = "Users"

class UserAndVacancy(models.Model):
    vacancy_id = models.CharField(max_length=255)
    user_id = models.CharField(max_length=255)
    class Meta:
        verbose_name = "Actions"
