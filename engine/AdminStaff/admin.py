from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Teacher, DESUser, Admin

admin.site.register(Teacher)
# admin.site.register(DESUser)
admin.site.register(Admin)

@admin.register(DESUser)
class DESUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'phone_number', 'is_staff', 'is_admin')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_admin')}),
        ('Personal info', {'fields': ('email', 'phone_number')}),
        )
    add_fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('email', 'phone_number')}),
        )