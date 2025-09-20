package reza.monolithicbackend.POST.domains.entities;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum PostType {
    FOUND, LOST;

//    @JsonCreator
//    public static PostType fromString(String value) {
//        return value == null ? null : PostType.valueOf(value.trim().toUpperCase());
//    }
}