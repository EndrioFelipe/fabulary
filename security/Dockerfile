# Etapa 1 – Build do Maven
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
RUN mvn -q -DskipTests clean package

# Etapa 2 – Imagem final
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

# 1. Imagem base com Maven + JDK para build
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app

# Copia o pom.xml e baixa dependências (cache)
COPY pom.xml .
RUN mvn -q dependency:go-offline

# Copia o código e gera o JAR
COPY src ./src
RUN mvn -q package -DskipTests

# 2. Imagem final mais leve (somente JDK + JAR)
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copia o jar do estágio de build
COPY --from=builder /app/target/*.jar app.jar

# Porta exposta (a do seu microserviço: 8080)
EXPOSE 8080

# Comando para rodar
ENTRYPOINT ["java", "-jar", "app.jar"]
