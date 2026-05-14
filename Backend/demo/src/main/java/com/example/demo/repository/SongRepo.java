package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Song;

@Repository
public interface SongRepo extends MongoRepository<Song, String> {

}
