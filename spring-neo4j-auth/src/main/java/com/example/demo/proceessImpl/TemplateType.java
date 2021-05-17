package com.example.demo.proceessImpl;
public enum TemplateType {
    REQUEST_ETAT("Etat de la demande"),
    REQUEST_VALIDATE("Demande ValidÃ©e"),
    REQUEST_REJECTED("Demande RejetÃ©e"),
    REQUEST_VALIDATE_SUP("Demande ValidÃ©e"),
    REQUEST_REJECTED_SUP("Demande RejetÃ©e"),
    REQUEST_CREATED("Nouvelle demande"),
    REQUEST_EXPORTED("Export des demandes"),
    OWNER_REQUEST_DELETED("Demande SupprimÃ©e"),
    VALIDATOR_REQUEST_DELETED("Demande SupprimÃ©e"),
    REQUEST_ERROR("Erreur des demandes"),
    REQUEST_REMINDER("Demande en attente");

    private String label;

    TemplateType(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}

