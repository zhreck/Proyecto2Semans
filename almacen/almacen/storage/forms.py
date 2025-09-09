from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model

User = get_user_model()

class SignUpForm(UserCreationForm):
    # Campos “externos” que mapearemos a first_name / last_name
    name  = forms.CharField(label="Nombre", max_length=30, required=True)
    nameA = forms.CharField(label="Apellido", max_length=30, required=True)

    email = forms.EmailField(label="Correo electrónico", required=True)
    terms = forms.BooleanField(label="Acepto los términos y condiciones", required=True)

    class Meta:
        model  = User
        # Solo campos del modelo User + los de UserCreationForm
        fields = ("username", "email", "password1", "password2")

        widgets = {
            "username": forms.TextInput(attrs={
                "class": "search-input",
                "autocomplete": "username",
                "autofocus": True
            }),
            "email": forms.EmailInput(attrs={
                "class": "search-input",
                "autocomplete": "email"
            }),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Asegura estilos en TODOS los campos
        self.fields["username"].widget.attrs.update({
            "class": "search-input", "autocomplete": "username", "autofocus": True
        })
        self.fields["name"].widget.attrs.update({
            "class": "search-input", "autocomplete": "given-name"
        })
        self.fields["nameA"].widget.attrs.update({
            "class": "search-input", "autocomplete": "family-name"
        })
        self.fields["email"].widget.attrs.update({
            "class": "search-input", "autocomplete": "email", "inputmode": "email"
        })
        self.fields["password1"].widget.attrs.update({
            "class": "search-input", "autocomplete": "new-password"
        })
        self.fields["password2"].widget.attrs.update({
            "class": "search-input", "autocomplete": "new-password"
        })
        self.fields["terms"].widget.attrs.update({"style": "accent-color:#4a9eff;"})

    def clean_email(self):
        email = self.cleaned_data.get("email", "").lower()
        if User.objects.filter(email__iexact=email).exists():
            raise forms.ValidationError("Ya existe una cuenta con este correo.")
        return email

    def save(self, commit=True):
        """
        Guarda el usuario y mapea name -> first_name y nameA -> last_name.
        """
        user = super().save(commit=False)
        user.first_name = self.cleaned_data.get("name", "")
        user.last_name  = self.cleaned_data.get("nameA", "")
        user.email      = self.cleaned_data.get("email", "")
        if commit:
            user.save()
        return user