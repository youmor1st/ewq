from django.http import JsonResponse
from rest_framework.decorators import api_view

from .models import Company, Vacancy, companies, vacancies, UserAndVacancy
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import VacancySerializer, UserAndVacancySerializer, UserSerializer, CompanySerializer


class VacancyList(APIView):
    def get(self, request, *args, **kwargs):
        serializer = VacancySerializer(vacancies(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = VacancySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VacancyDetail(APIView):
    def get_object(self, pk):
        try:
            return Vacancy.objects.get(pk=pk)
        except Vacancy.DoesNotExist as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        vacancy = self.get_object(pk)
        serializer = VacancySerializer(vacancy)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        vacancy = self.get_object(pk)
        serializer = VacancySerializer(vacancy, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        vacancy = self.get_object(pk)
        vacancy.delete()
        return Response({'delete': True}, status=status.HTTP_202_ACCEPTED)
@api_view(['POST'])
def addVacancyToUser(request):  
    serializer = UserAndVacancySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'status': 'created'},
            status=status.HTTP_201_CREATED
        )
    return Response(
            {'status': 'bad request'},
            status=status.HTTP_400_BAD_REQUEST
        )
@api_view(['POST'])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'data': serializer.data},
            status=status.HTTP_201_CREATED
        )

    return Response(
        {'data': serializer.errors},
        status=status.HTTP_400_BAD_REQUEST
    )
@api_view(['POST','DELETE'])
def getUserVacancies(request):
    serializer = UserAndVacancySerializer(data=request.data)
    if serializer.is_valid():
        uservacancies=UserAndVacancy.objects.all()
        vacancies=Vacancy.objects.all()
        arr=[]
        for i in uservacancies:

            if i.user_id==serializer.data['user_id']:
                # print(i.user_id,i.vacancy_id)
                for v in vacancies:
                    if str(v.id)==i.vacancy_id:
                        arr.append(v)
        serialize1r = VacancySerializer(arr, many=True)
        return Response(serialize1r.data   )
  


@api_view(['GET', 'PUT', 'DELETE'])
def get_company(request, company_id):
    try:
        company = Company.objects.get(pk=company_id)
    except Company.DoesNotExist as e:
        return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = CompanySerializer(company)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == "PUT":
        company = Company.objects.get(pk=company_id)
        serializer = CompanySerializer(instance=company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        company.delete()
        return Response({"deleted": True}, status=status.HTTP_202_ACCEPTED)


@api_view(['GET', 'POST'])
def get_companies(request):
    if request.method == "GET":
        serializer = CompanySerializer(companies(), many=True)
        return Response(serializer.data)
    if request.method == "POST":
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def vacancies_by_company(request, company_id):
    company = Company.objects.get(pk=company_id)
    vacancies_ = [v for v in vacancies() if v.company.name == company.name]
    serializer = VacancySerializer(vacancies_, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def top_ten(request):
    top = Vacancy.objects.all().order_by('-salary')[:10]
    serializer = VacancySerializer(top, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
