package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "Album")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Album {

    @Id
    private String mongoId;

    @Field("id")
    private Long deezerId;

    private String title;

    @Field("release_date")
    private String releaseDate;

    private String cover;
}