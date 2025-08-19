package reza.postservice.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import reza.postservice.domains.entities.Threads;

import java.util.List;
import java.util.UUID;

public interface ThreadService {

    public Threads createThread(String title, String description, String location, UUID creatorId);
    public void deleteThread(Long id);
    public Page<Threads> getThreadsSortedByCreation(Pageable pageable);
    public Threads getThread(Long id);
    public Page<Threads> getThreadsByThreadTitle(String title, Pageable pageable);
    public Page<Threads> getThreadsByLocation(String location, Pageable pageable);
}
