package com.example.demo.proceessImpl;

public class EmailModule {
    
    private long id;
    
    private String message;
    private String sujet;
    
    private TemplateType type;

    public EmailModule() {
    }

    public EmailModule(String message, String rejectionReason, String sujet, TemplateType type) {
        this.message = message;
        this.sujet = sujet;
        this.type = type;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSujet() {
        return sujet;
    }

    public void setSujet(String sujet) {
        this.sujet = sujet;
    }

    public TemplateType getType() {
        return type;
    }

    public void setType(TemplateType type) {
        this.type = type;
    }

    public static class Builder {

        private String message;
        private String rejectionReason;
        private String sujet;
        private TemplateType type;

        public Builder setMessage(String message) {
            this.message = message;
            return this;
        }

        public Builder setSujet(String sujet) {
            this.sujet = sujet;
            return this;
        }

        public Builder setType(TemplateType type) {
            this.type = type;
            return this;
        }

        public EmailModule build() {
            return new EmailModule(message,rejectionReason, sujet, type);
        }
    }
}
