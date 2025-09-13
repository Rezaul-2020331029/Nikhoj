package reza.monolithicbackend.POST.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reza.monolithicbackend.POST.domains.dtos.request.SearchThreadReq;
import reza.monolithicbackend.POST.domains.entities.Threads;
import reza.monolithicbackend.POST.repos.PostRepo;
import reza.monolithicbackend.POST.repos.ThreadRepo;
import reza.monolithicbackend.POST.services.ThreadService;


import java.util.List;
import java.util.UUID;
@Service
public class ThreadServiceImpl implements ThreadService {

    private final ThreadRepo threadRepository;
    private final PostRepo postRepository;


    @Autowired
    public ThreadServiceImpl(ThreadRepo threadRepository, PostRepo postRepository) {
        this.threadRepository = threadRepository;
        this.postRepository = postRepository;
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

    @Override
    public Page<Threads> searchThreads(SearchThreadReq searchReq) {
        Pageable pageable = PageRequest.of(searchReq.getPage(), searchReq.getSize(), Sort.by(Sort.Direction.DESC, "created"));

        // If both title and location are provided
        if (searchReq.getTitle() != null && !searchReq.getTitle().trim().isEmpty() &&
                searchReq.getLocation() != null && !searchReq.getLocation().trim().isEmpty()) {
            return threadRepository.findByTitleContainingIgnoreCase(
                    searchReq.getTitle(), pageable);
        }

        // If only title is provided
        if (searchReq.getTitle() != null && !searchReq.getTitle().trim().isEmpty()) {
            return threadRepository.findByTitleContainingIgnoreCase(searchReq.getTitle(), pageable);
        }

        // If only location is provided
        if (searchReq.getLocation() != null && !searchReq.getLocation().trim().isEmpty()) {
            return threadRepository.findByLocationContainingIgnoreCase(searchReq.getLocation(), pageable);
        }

        // If no search criteria, return all threads
        return threadRepository.findAll(pageable);
    }

    @Override
    public List<Threads> getThreadsByUserId(UUID userId) {
        return postRepository.findDistinctThreadsByPosterId(userId);
    }


}
