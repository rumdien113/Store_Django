from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework import status

from Account.serializers import AccountSerializer
from Account.models import Account

@csrf_exempt
@api_view(['POST'])
def LoginAPI(request):
    if request.method == 'POST':
        account_data = JSONParser().parse(request)
        username = account_data['username']
        password = account_data['password']

        user = None
        if '@' in username:
            try:
                user = Account.objects.get(email=username)
            except Account.DoesNotExist:
                pass
        if not user:
            user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'role': user.role}, status=status.HTTP_200_OK)
    return Response({'error': 'Wrong credentials'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def RegisterAPI(request):
    if request.method == 'POST':
        account_serializer = AccountSerializer(data=request.data)
        if account_serializer.is_valid():
            account_serializer.save()
            return Response({'message': 'Register successfully!'}, status=status.HTTP_201_CREATED, safe=False)
        return Response({'message': 'Register failed!'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def LogoutAPI(request):
    if request.method == 'POST':
        try:
            request.user.auth_token.delete()
            return Response({'success': 'Logout successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def AUserAPI(request):
    if request.method == 'GET':
        current_user = request.user
        account = Account.objects.get(id=current_user.id)
        account_serializer = AccountSerializer(account)
        return Response(account_serializer.data, status=status.HTTP_200_OK)

@csrf_exempt
def SaveImage(request):
    file = request.FILES['file']
    file_name = default_storage.save(file.name, file)
    return Response(file_name, status=status.HTTP_200_OK)





def AccountAPI(request):
    if request.method == 'PUT':
        account_data = JSONParser().parse(request)
        account = Account.objects.get(id=account_data['id'])
        account_serializer = AccountSerializer(account, data=account_data)
        if account_serializer.is_valid():
            account_serializer.save()
            return Response('Update successfully!', safe=False)
        return Response('Update failed!', safe=False)
    elif request.method == 'DELETE':
        account_data = JSONParser().parse(request)
        account = Account.objects.get(id=account_data['id'])
        account.delete()
        return Response('Delete successfully!', safe=False)
    