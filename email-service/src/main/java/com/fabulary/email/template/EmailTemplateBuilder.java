package com.fabulary.email.template;

public class EmailTemplateBuilder {

    public static String buildStoryCreatedEmail(String title, String author, String description, String url) {

        return """
                <html>
                  <body style="font-family: Arial, sans-serif; background: #f7f7f7; padding: 20px;">
                    <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px;">
                      
                      <h2 style="text-align: center; color: #333;">Novo conto publicado</h2>

                      <p style="font-size: 16px; color: #444;">
                        Olá! Um novo conto foi publicado no <strong>Fabulary</strong>.
                      </p>

                      <p style="font-size: 17px;">
                        <strong>Título:</strong> %s
                      </p>

                      <p style="font-size: 17px;">
                        <strong>Autor:</strong> %s
                      </p>

                      <p style="font-size: 16px; margin-top: 15px; color: #555;">
                        %s
                      </p>

                      <div style="text-align: center; margin-top: 30px;">
                        <a href="%s"
                           style="background: #6d3aff; color: white; padding: 12px 22px; 
                                  text-decoration: none; border-radius: 6px; font-size: 16px;">
                          Ler conto completo
                        </a>
                      </div>

                      <p style="text-align: center; font-size: 12px; color: #777; margin-top: 40px;">
                        Este email foi gerado automaticamente pelo sistema Fabulary.
                      </p>

                    </div>
                  </body>
                </html>
                """.formatted(title, author, description, url);
    }
}