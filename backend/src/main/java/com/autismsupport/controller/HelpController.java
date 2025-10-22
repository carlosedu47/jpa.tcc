package com.autismsupport.controller;

import com.autismsupport.model.HelpRequest;
import com.autismsupport.repository.HelpRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/help")
@CrossOrigin(origins = "http://localhost:3000")
public class HelpController {
    
    @Autowired
    private HelpRequestRepository helpRequestRepository;
    
    @PostMapping("/request")
    public HelpRequest createHelpRequest(@RequestBody HelpRequest helpRequest) {
        return helpRequestRepository.save(helpRequest);
    }
    
    @GetMapping("/requests")
    public List<HelpRequest> getAllRequests() {
        return helpRequestRepository.findAll();
    }
}