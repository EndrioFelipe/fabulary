# ================================
# 1. Build da aplicação (imagem maior)
# ================================
FROM maven:3.9.6-eclipse-temurin-17 AS builder

# diretório onde vai rodar o build
WORKDIR /app

# copia somente o pom.xml primeiro (cache)
COPY pom.xml .

# baixa dependências para cache
RUN mvn -q dependency:go-offline

# copia o código fonte
COPY src ./src

# build do projeto (gera o JAR)
RUN mvn -q package -DskipTests


# ================================
# 2. Imagem Final (leve)
# ================================
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# copia o jar do estágio "builder"
COPY --from=builder /app/target/*.jar app.jar

# expõe a porta do gateway
EXPOSE 8085

# comando de execução
ENTRYPOINT ["java", "-jar", "app.jar"]