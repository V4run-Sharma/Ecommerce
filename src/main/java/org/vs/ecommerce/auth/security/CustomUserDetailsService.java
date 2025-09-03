package org.vs.ecommerce.auth.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.vs.ecommerce.auth.model.Users;
import org.vs.ecommerce.auth.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
            Users user = userRepository.findByEmail(email);
            return new UserPrincipal(user);
        } catch (Exception e) {
            throw new UsernameNotFoundException(e.getMessage());
        }
    }
}

