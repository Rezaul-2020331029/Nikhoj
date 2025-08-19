package reza.postservice.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import reza.postservice.repos.ThreadRepo;
import reza.postservice.services.ThreadService;
import reza.postservice.domains.entities.Threads;
import java.util.List;
import java.util.UUID;
@Service
public class ThreadServiceImpl implements ThreadService {

    private final ThreadRepo threadRepository;

    @Autowired
    public ThreadServiceImpl(ThreadRepo threadRepository) {
        this.threadRepository = threadRepository;
    }
    @Override
    public Threads createThread(String title, String description, String location, UUID creatorId) {
        Threads threads = new Threads();
        threads.setTitle(title);
        threads.setDescription(description);
        threads.setLocation(location);
        threads.setCreatorId(creatorId);
        return threadRepository.save(threads);
    }
    @Override
    public void deleteThread(Long id) {
        threadRepository.deleteById(id);
    }

    @Override
    public Page<Threads> getThreadsSortedByCreation(Pageable pageable) {

        return threadRepository.findAll(pageable);
    }


    @Override
    public Threads getThread(Long id) {
        return threadRepository.getThreadsByThreadId(id);
    }

    @Override
    public Page<Threads> getThreadsByThreadTitle(String title, Pageable pageable) {

        return threadRepository.findByTitleContainingIgnoreCase(title, pageable);
    }

    @Override
    public Page<Threads> getThreadsByLocation(String location, Pageable pageable) {
        return threadRepository.findByLocationContainingIgnoreCase(location,pageable);
    }
}
