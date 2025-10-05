import java.util.*;

public class FeuerwehrPlaner {
    static class Raum {
        String name;
        String creator;
        List<String> messages = new ArrayList<>();
        List<String> termine = new ArrayList<>();
    }

    static Map<String, Raum> raeume = new HashMap<>();
    static Scanner scanner = new Scanner(System.in);
    static String aktuellerCode = null;
    static String aktuellerBenutzer = null;
    static boolean istErsteller = false;

    public static void main(String[] args) {
        System.out.println("🚒 Jugendfeuerwehr Terminplaner");
        while (true) {
            System.out.println("\nWas möchtest du tun?");
            System.out.println("1. Raum erstellen");
            System.out.println("2. Raum beitreten");
            System.out.println("3. Chatnachricht senden");
            System.out.println("4. Termin hinzufügen");
            System.out.println("5. Alle Termine anzeigen");
            System.out.println("6. Beenden");
            System.out.print("Auswahl: ");
            String choice = scanner.nextLine();

            switch (choice) {
                case "1" -> raumErstellen();
                case "2" -> raumBeitreten();
                case "3" -> chatSenden();
                case "4" -> terminHinzufuegen();
                case "5" -> termineAnzeigen();
                case "6" -> System.exit(0);
                default -> System.out.println("Ungültige Auswahl.");
            }
        }
    }

    static void raumErstellen() {
        System.out.print("Dein Name: ");
        aktuellerBenutzer = scanner.nextLine().trim();
        System.out.print("Name der Jugendfeuerwehr: ");
        String name = scanner.nextLine().trim();
        String code = UUID.randomUUID().toString().substring(0, 6).toUpperCase();

        Raum raum = new Raum();
        raum.name = name;
        raum.creator = aktuellerBenutzer;
        raeume.put(code, raum);

        aktuellerCode = code;
        istErsteller = true;
        System.out.println("✅ Raum erstellt mit Code: " + code);
    }

    static void raumBeitreten() {
        System.out.print("Dein Name: ");
        aktuellerBenutzer = scanner.nextLine().trim();
        System.out.print("Raum-Code: ");
        String code = scanner.nextLine().trim().toUpperCase();

        if (!raeume.containsKey(code)) {
            System.out.println("❌ Raum nicht gefunden.");
            return;
        }

        aktuellerCode = code;
        istErsteller = raeume.get(code).creator.equals(aktuellerBenutzer);
        System.out.println("✅ Beigetreten zu Raum: " + raeume.get(code).name);
    }

    static void chatSenden() {
        if (aktuellerCode == null) {
            System.out.println("⚠️ Du bist in keinem Raum.");
            return;
        }
        System.out.print("Nachricht: ");
        String msg = scanner.nextLine().trim();
        raeume.get(aktuellerCode).messages.add(aktuellerBenutzer + ": " + msg);
        System.out.println("💬 Nachricht gesendet.");
    }

    static void terminHinzufuegen() {
        if (aktuellerCode == null || !istErsteller) {
            System.out.println("❌ Nur der Ersteller kann Termine hinzufügen.");
            return;
        }

        System.out.print("Datum (YYYY-MM-DD): ");
        String datum = scanner.nextLine().trim();
        System.out.print("Art der Übung: ");
        String art = scanner.nextLine().trim();
        System.out.print("Dauer: ");
        String dauer = scanner.nextLine().trim();

        String termin = datum + " – " + art + " (" + dauer + ")";
        raeume.get(aktuellerCode).termine.add(termin);
        System.out.println("📅 Termin hinzugefügt.");
    }

    static void termineAnzeigen() {
        if (aktuellerCode == null) {
            System.out.println("⚠️ Du bist in keinem Raum.");
            return;
        }

        List<String> termine = raeume.get(aktuellerCode).termine;
        if (termine.isEmpty()) {
            System.out.println("Keine Termine vorhanden.");
        } else {
            System.out.println("📅 Termine:");
            for (String t : termine) {
                System.out.println("🔥 " + t);
            }
        }
    }
}


</body>
</html>
