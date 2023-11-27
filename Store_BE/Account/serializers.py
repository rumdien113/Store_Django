from rest_framework import serializers
from Account.models import Account

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'email', 'username', 'phone', 'address', 'avatar', 'role']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        user = Account(
            email=validated_data['email'],
            username=validated_data['username'],
            phone=validated_data['phone'],
            address=validated_data['address'],
            role=validated_data['role']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user