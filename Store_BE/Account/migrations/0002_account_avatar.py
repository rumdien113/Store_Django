# Generated by Django 4.1.13 on 2023-11-26 19:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='avatar',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
