pipeline {
    agent any
    environment {
        SONARQUBE = credentials('sonar-token') // ชื่อ Credential ของ Jenkins
    }
    tools { nodejs 'NodeJS-24.7.0' }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Thanaphum-6510110194/SonarQube-Integration.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'npx sonar-scanner -Dsonar.projectKey=mywebapp'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
