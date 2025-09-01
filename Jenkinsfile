pipeline {
    agent any

    tools {
        nodejs 'NodeJS-24.7.0'  // <-- Use the exact name from Global Tool Configuration
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'feature/lab', url: 'https://github.com/Thanaphum-6510110194/SonarQube-Integration.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv('sonarqube-25.8.0.112029') {
                    sh 'npx sonar-scanner -Dsonar.projectKey=SonarQube-Integration-with-Jenkins'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
