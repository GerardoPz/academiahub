## 📊 Modelo de Base de Datos (ERD)

Este proyecto utiliza **Mermaid.js** para visualizar el esquema. El núcleo de la gestión de usuarios se basa en la tabla `profiles`, la cual se extiende de la autenticación nativa de Supabase (`auth.users`).

```mermaid
erDiagram
    %% Relaciones Lógicas
    CARRERAS ||--o{ PROFILES : "estudiante_pertenece_a"
    CARRERAS ||--o{ PLAN_ESTUDIOS : "posee"
    MATERIAS ||--o{ PLAN_ESTUDIOS : "se_integra_en"
    PLAN_ESTUDIOS ||--o{ REQUISITOS : "define_dependencias"

    PROFILES {
        uuid id PK "FK a auth.users"
        uuid carrera_id FK "Solo para rol ESTUDIANTE"
        string nombres
        string apellido_paterno
        string apellido_materno
        string email "UNIQUE"
        enum rol "ADMIN | DOCENTE | ESTUDIANTE"
        string identificacion_oficial "UNIQUE (CURP/DNI)"
        date fecha_nacimiento
        enum genero "M | F | Otro"
        string telefono_celular
        string contacto_emergencia_nombre
        string contacto_emergencia_telefono
        string direccion_calle_num
        string direccion_colonia
        string direccion_cp
        string direccion_ciudad
        timestamp created_at
        timestamp updated_at
    }

    CARRERAS {
        uuid id PK
        string nombre "Ej: Ing. en Software"
        string codigo_carrera "UNIQUE"
        int duracion_semestres_minimo
        int duracion_semestres_maximo
    }

    MATERIAS {
        uuid id PK
        string codigo_materia "UNIQUE"
        string nombre
        int creditos_base
    }

    PLAN_ESTUDIOS {
        uuid id PK
        uuid carrera_id FK
        uuid materia_id FK
        int semestre_sugerido
        enum tipo_materia "OBLIGATORIA | OPTATIVA | ELECTIVA"
        int creditos_especificos "Créditos según este plan"
    }

    REQUISITOS {
        uuid id PK
        uuid plan_estudio_id FK "Materia que se desea cursar"
        uuid requisito_plan_id FK "Materia previa necesaria"
        enum tipo_bloqueo "FUERTE | DEBIL"
    }
```
