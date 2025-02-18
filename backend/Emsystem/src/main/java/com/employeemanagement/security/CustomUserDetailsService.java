package com.employeemanagement.security;

import com.employeemanagement.entity.User;
import com.employeemanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Use the repository method findByCompanyEmail to load the user.
        User user = userRepository.findByCompanyEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with company email: " + username));

        // Create a list of authorities based on the user's role.
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));

        // Return a Spring Security User with company email as the username.
        return new org.springframework.security.core.userdetails.User(
                user.getCompanyEmail(), 
                user.getPassword(), 
                authorities
        );
    }
}
