package com.fabulary.stories.controllers;

import com.fabulary.stories.enums.AgeRange;
import com.fabulary.stories.models.ChildrenBook;
import com.fabulary.stories.services.ChildrenBookService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


import java.util.List;

@WebMvcTest(ChildrenBookController.class)
class ChildrenBookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ChildrenBookService childrenBookService;

    @Test
    void shouldFilterBooksByAgeRange() throws Exception {
        ChildrenBook book = new ChildrenBook();
        book.setTitle("Teste");
        book.setAgeRange(AgeRange.THREE_TO_FIVE);

        Mockito.when(childrenBookService.filter(
                Mockito.any(),
                Mockito.any(),
                Mockito.any(),
                Mockito.eq(AgeRange.THREE_TO_FIVE)
        )).thenReturn(List.of(book));

        mockMvc.perform(get("/api/v1/stories/children/filter")
                        .param("ageRange", "THREE_TO_FIVE")
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].ageRange").value("THREE_TO_FIVE"));


    }


}
