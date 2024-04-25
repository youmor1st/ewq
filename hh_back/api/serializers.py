from rest_framework import serializers
from rest_framework.views import APIView

from .models import Company, Vacancy,UserAndVacancy
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status



class RegistrationAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'token')

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
            instance.save()
            return instance

class CompanySerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    name = serializers.CharField()

    def create(self, validated_data):
        company = Company.objects.create(**validated_data)
        return company

    def update(self, instance, validated_data):
        instance.id = instance.id
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance
    
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('name','password')
#         read_only_field = ['name']

class VacancySerializer(serializers.ModelSerializer):
    company = serializers.SlugRelatedField(queryset=Company.objects.all(), slug_field='name')

    class Meta:
        model = Vacancy
        fields = ('id', 'name', 'description', 'direction', 'company')
        read_only_field = ['id']

class UserAndVacancySerializer(serializers.ModelSerializer):
    user_id=  serializers.CharField()
    vacancy_id = serializers.CharField()
    class Meta:
        model = UserAndVacancy
        fields = ('user_id', 'vacancy_id')