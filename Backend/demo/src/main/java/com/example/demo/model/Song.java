package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "Song")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Song {

    @Id
    private String mongoId;

    @Field("id")
    private Long deezerId;

    private String title;

    private String artist;

    @Field("artist_id")
    private Long artistId;

    private String album;

    @Field("album_id")
    private Long albumId;

    private Integer duration;

    private Integer rank;

    private String preview;

    private String source;

}
