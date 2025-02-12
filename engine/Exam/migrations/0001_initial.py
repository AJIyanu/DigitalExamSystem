# Generated by Django 5.1.6 on 2025-02-11 19:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.CharField(default='<function uuid4 at 0x7f6377cd1ee0>', editable=False, max_length=36, primary_key=True, serialize=False)),
                ('question_type', models.CharField(choices=[('multiple_choice', 'multiple_choice'), ('radio_choice', 'radio_choice'), ('boolean', 'boolean')], max_length=20)),
                ('question', models.CharField(max_length=255)),
                ('instruction', models.CharField(max_length=255)),
                ('answer1', models.CharField(blank=True, max_length=125, null=True)),
                ('answer2', models.CharField(blank=True, max_length=125, null=True)),
                ('answer3', models.CharField(blank=True, max_length=125, null=True)),
                ('answer4', models.CharField(blank=True, max_length=125, null=True)),
                ('option1', models.CharField(max_length=125)),
                ('option2', models.CharField(max_length=125)),
                ('option3', models.CharField(blank=True, max_length=125, null=True)),
                ('option4', models.CharField(blank=True, max_length=125, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='SolvedQuestion',
            fields=[
                ('id', models.CharField(default='<function uuid4 at 0x7f6377cd1ee0>', editable=False, max_length=36, primary_key=True, serialize=False)),
                ('answer', models.CharField(max_length=125)),
                ('answer2', models.CharField(blank=True, max_length=125, null=True)),
                ('answer3', models.CharField(blank=True, max_length=125, null=True)),
                ('answer4', models.CharField(blank=True, max_length=125, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.CharField(default='<function uuid4 at 0x7f6377cd1ee0>', editable=False, max_length=36, primary_key=True, serialize=False)),
                ('subject', models.CharField(max_length=15, unique=True)),
                ('subject_description', models.CharField(max_length=50)),
                ('total_number_of_students', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='SubjectScoreSheet',
            fields=[
                ('id', models.CharField(default='<function uuid4 at 0x7f6377cd1ee0>', editable=False, max_length=36, primary_key=True, serialize=False)),
                ('mark_obtainable_attendance', models.IntegerField(default=10)),
                ('mark_obtainable_assignment', models.IntegerField(default=10)),
                ('mark_obtainable_test', models.IntegerField(default=20)),
                ('mark_obtainable_exam', models.IntegerField(default=60)),
            ],
        ),
    ]
