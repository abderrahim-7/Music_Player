package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "Artist")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Artist {

    @Id
    private String mongoId;

    @Field("id")
    private Long deezerId;

    private String name;

    private String picture;
}