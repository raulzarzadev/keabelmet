% Gráficas del blog Keabelmet (serie Sardine Run). Datos reales de NOAA.
% Uso: desde la raíz del repo, con los CSV de datos en la carpeta actual:
%   matlab -batch "run('docs/blog/graficas.m')"
% Los CSV (c_ui, c_clim, c_oni, c_anom, c_2026, c_chl2015) se generan con los
% datos de NOAA ERDDAP descritos en constants/blog/fuentes.ts.
out = fullfile(pwd, 'public', 'blog', 'graficas');
if ~exist(out, 'dir'); mkdir(out); end

C.bg    = [11 29 42]/255;      % fondo
C.sand  = [244 239 228]/255;   % texto
C.dim   = [205 198 180]/255;
C.grid  = [244 239 228]/255;
C.teal  = [40 194 160]/255;
C.coral = [255 107 74]/255;
C.blue  = [90 170 230]/255;
C.gold  = [242 193 78]/255;
F = 'Arial';

L.es.mon = {'Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'};
L.en.mon = {'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'};

ui   = readtable('c_ui.csv');
cl   = readtable('c_clim.csv');
oni  = readtable('c_oni.csv');
an   = readtable('c_anom.csv');
y26  = readtable('c_2026.csv');
c15  = readtable('c_chl2015.csv');

for lang = {'es','en'}
    lg = lang{1}; M = L.(lg).mon; es = strcmp(lg,'es');

    %% 1. Surgencia mensual (24N 113W)
    f = newfig(C); ax = styleax(axes(f), C, F); hold(ax, 'on');
    b = bar(ax, ui.m, ui.v, 0.7, 'FaceColor', 'flat', 'EdgeColor', 'none');
    b.CData = repmat(C.teal, 12, 1); b.CData(11:12,:) = repmat(C.coral, 2, 1);
    xticks(ax, 1:12); xticklabels(ax, M); xlim(ax, [0.4 12.6]);
    for k = 1:12; text(ax, k, ui.v(k)+5, sprintf('%.0f', ui.v(k)), 'HorizontalAlignment','center','Color',C.sand,'FontName',F,'FontSize',12); end
    if es
        title(ax, 'Fuerza de la surgencia frente a Bahía Magdalena (promedio 1991–2020)', 'Color', C.sand);
        ylabel(ax, 'Índice de surgencia (m³/s por cada 100 m de costa)');
        text(ax, 11.5, ui.v(11)+28, {'Temporada del','Sardine Run'}, 'Color', C.coral, 'HorizontalAlignment','center','FontName',F,'FontSize',13,'FontWeight','bold');
        src = 'Datos: NOAA SWFSC/ERD, Índice de Surgencia Costera de Bakun a 24°N 113°W. Gráfica: Keabelmet.';
    else
        title(ax, 'Upwelling strength off Magdalena Bay (1991–2020 average)', 'Color', C.sand);
        ylabel(ax, 'Upwelling index (m³/s per 100 m of coastline)');
        text(ax, 11.5, ui.v(11)+28, {'Sardine Run','season'}, 'Color', C.coral, 'HorizontalAlignment','center','FontName',F,'FontSize',13,'FontWeight','bold');
        src = 'Data: NOAA SWFSC/ERD, Bakun Coastal Upwelling Index at 24°N 113°W. Chart: Keabelmet.';
    end
    ylim(ax, [0 200]); footer(f, src, C, F); save(f, out, ['surgencia-mensual-' lg]);

    %% 2. Bahía Magdalena mes a mes: temperatura + clorofila
    f = newfig(C, 760); t = tiledlayout(f, 2, 1, 'TileSpacing', 'compact', 'Padding', 'compact'); t.OuterPosition = [0 0.05 1 0.95];
    ax1 = styleax(nexttile(t), C, F); hold(ax1, 'on');
    fill(ax1, [cl.m; flipud(cl.m)], [cl.p10; flipud(cl.p90)], C.coral, 'FaceAlpha', 0.18, 'EdgeColor', 'none');
    plot(ax1, cl.m, cl.sst, '-o', 'Color', C.coral, 'LineWidth', 2.5, 'MarkerFaceColor', C.coral, 'MarkerSize', 6);
    for k = 1:12; text(ax1, k, cl.sst(k)+0.9, sprintf('%.1f', cl.sst(k)), 'HorizontalAlignment','center','Color',C.sand,'FontName',F,'FontSize',11.5); end
    xticks(ax1, 1:12); xticklabels(ax1, M); xlim(ax1, [0.6 12.4]); ylim(ax1, [15 30]);
    ax2 = styleax(nexttile(t), C, F); hold(ax2, 'on');
    b = bar(ax2, cl.m, cl.chl, 0.7, 'FaceColor', C.teal, 'EdgeColor', 'none');
    for k = 1:12; text(ax2, k, cl.chl(k)+0.07, sprintf('%.2f', cl.chl(k)), 'HorizontalAlignment','center','Color',C.sand,'FontName',F,'FontSize',11.5); end
    xticks(ax2, 1:12); xticklabels(ax2, M); xlim(ax2, [0.6 12.4]); ylim(ax2, [0 1.75]);
    if es
        title(ax1, 'Temperatura del mar frente a Bahía Magdalena (°C, 1991–2020)', 'Color', C.sand);
        ylabel(ax1, '°C'); legend(ax1, {'Rango habitual (10–90 %)','Promedio'}, 'TextColor', C.sand, 'Color', 'none', 'EdgeColor', 'none', 'Location', 'northwest');
        title(ax2, 'Clorofila (fitoplancton) en la superficie (mg/m³, mediana 2003–2022)', 'Color', C.sand);
        ylabel(ax2, 'mg/m³');
        src = 'Datos: NOAA OISST v2.1 (24.625°N, 112.375°W) y NASA MODIS-Aqua vía NOAA ERDDAP. Gráfica: Keabelmet.';
    else
        title(ax1, 'Sea temperature off Magdalena Bay (°C, 1991–2020)', 'Color', C.sand);
        ylabel(ax1, '°C'); legend(ax1, {'Typical range (10–90%)','Average'}, 'TextColor', C.sand, 'Color', 'none', 'EdgeColor', 'none', 'Location', 'northwest');
        title(ax2, 'Surface chlorophyll (phytoplankton) (mg/m³, 2003–2022 median)', 'Color', C.sand);
        ylabel(ax2, 'mg/m³');
        src = 'Data: NOAA OISST v2.1 (24.625°N, 112.375°W) and NASA MODIS-Aqua via NOAA ERDDAP. Chart: Keabelmet.';
    end
    footer(f, src, C, F); save(f, out, ['magdalena-mes-a-mes-' lg]);

    %% 3. Índice ONI 1980–2026
    f = newfig(C); ax = styleax(axes(f), C, F); hold(ax, 'on');
    pos = max(oni.v, 0); neg = min(oni.v, 0);
    area(ax, oni.t, pos, 'FaceColor', C.coral, 'EdgeColor', 'none', 'FaceAlpha', 0.9);
    area(ax, oni.t, neg, 'FaceColor', C.blue, 'EdgeColor', 'none', 'FaceAlpha', 0.9);
    yline(ax, 0.5, ':', 'Color', C.dim, 'LineWidth', 1.2);
    yline(ax, 2.5, '--', 'Color', C.gold, 'LineWidth', 1.6);
    xlim(ax, [1980 2028.6]); ylim(ax, [-2.2 3.4]);
    pk = {1983.0, 2.04, '1982–83'; 1997.9, 2.42, '1997–98'; 2015.9, 2.6, '2015–16'; 2023.9, 1.97, '2023–24'; 2026.9, 2.18, '2026'};
    for k = 1:size(pk,1); text(ax, pk{k,1}, pk{k,2}+0.25, pk{k,3}, 'Color', C.sand, 'HorizontalAlignment','center','FontName',F,'FontSize',12,'FontWeight','bold'); end
    if es
        title(ax, 'El Niño y La Niña desde 1980 (índice ONI de NOAA, °C)', 'Color', C.sand);
        ylabel(ax, 'Anomalía de temperatura en el Pacífico ecuatorial (°C)');
        text(ax, 1981, 3.1, 'Umbral de un evento histórico según NOAA: +2.5 °C', 'Color', C.gold, 'FontName', F, 'FontSize', 12);
        text(ax, 1981, 0.75, 'El Niño: +0.5 °C o más', 'Color', C.dim, 'FontName', F, 'FontSize', 11);
        src = 'Datos: NOAA CPC/PSL, Oceanic Niño Index (ERSST v6), consultado en octubre de 2026. Gráfica: Keabelmet.';
    else
        title(ax, 'El Niño and La Niña since 1980 (NOAA ONI index, °C)', 'Color', C.sand);
        ylabel(ax, 'Equatorial Pacific temperature anomaly (°C)');
        text(ax, 1981, 3.1, 'NOAA threshold for a historic event: +2.5 °C', 'Color', C.gold, 'FontName', F, 'FontSize', 12);
        text(ax, 1981, 0.75, 'El Niño: +0.5 °C or more', 'Color', C.dim, 'FontName', F, 'FontSize', 11);
        src = 'Data: NOAA CPC/PSL, Oceanic Niño Index (ERSST v6), accessed October 2026. Chart: Keabelmet.';
    end
    footer(f, src, C, F); save(f, out, ['oni-1980-2026-' lg]);

    %% 4. Anomalía de temperatura frente a Bahía Magdalena 1982–2026
    f = newfig(C); ax = styleax(axes(f), C, F); hold(ax, 'on');
    b1 = bar(ax, an.t(an.a>=0), an.a(an.a>=0), 1, 'FaceColor', C.coral, 'EdgeColor', 'none');
    b2 = bar(ax, an.t(an.a<0),  an.a(an.a<0),  1, 'FaceColor', C.blue,  'EdgeColor', 'none');
    xlim(ax, [1981.5 2028.4]); ylim(ax, [-4 5.3]);
    pk = {1983.5, '1983'; 1997.6, '1997–98'; 2014.55, {'2014–15','"La Mancha"'}; 2026.6, '2026'};
    if ~es; pk{3,2} = {'2014–15','"The Blob"'}; end
    pky = [3.5 4.1 4.75 4.0];
    for k = 1:size(pk,1); text(ax, pk{k,1}, pky(k), pk{k,2}, 'Color', C.sand, 'HorizontalAlignment','center','FontName',F,'FontSize',12,'FontWeight','bold'); end
    if es
        title(ax, 'Qué tan caliente o frío estuvo el mar frente a Bahía Magdalena, mes a mes', 'Color', C.sand);
        ylabel(ax, 'Diferencia contra el promedio 1991–2020 (°C)');
        src = 'Datos: NOAA OISST v2.1, 24.625°N 112.375°W (muestreo cada 3 días, 1982 – 12 oct 2026). Gráfica: Keabelmet.';
    else
        title(ax, 'How warm or cold the sea off Magdalena Bay was, month by month', 'Color', C.sand);
        ylabel(ax, 'Difference from the 1991–2020 average (°C)');
        src = 'Data: NOAA OISST v2.1, 24.625°N 112.375°W (sampled every 3 days, 1982 – Oct 12, 2026). Chart: Keabelmet.';
    end
    footer(f, src, C, F); save(f, out, ['anomalia-magdalena-' lg]);

    %% 5. 2026 frente al promedio
    f = newfig(C); ax = styleax(axes(f), C, F); hold(ax, 'on');
    fill(ax, [cl.m; flipud(cl.m)], [cl.p10; flipud(cl.p90)], C.teal, 'FaceAlpha', 0.16, 'EdgeColor', 'none');
    plot(ax, cl.m, cl.sst, '-', 'Color', C.teal, 'LineWidth', 2.2);
    plot(ax, y26.m, y26.sst, '-o', 'Color', C.coral, 'LineWidth', 3, 'MarkerFaceColor', C.coral, 'MarkerSize', 7);
    for k = 1:height(y26); text(ax, y26.m(k), y26.sst(k)+0.8, sprintf('%.1f', y26.sst(k)), 'HorizontalAlignment','center','Color',C.coral,'FontName',F,'FontSize',12,'FontWeight','bold'); end
    xticks(ax, 1:12); xticklabels(ax, M); xlim(ax, [0.6 12.4]); ylim(ax, [15 32]);
    if es
        title(ax, 'Temperatura del mar frente a Bahía Magdalena: 2026 contra lo normal', 'Color', C.sand);
        ylabel(ax, '°C');
        legend(ax, {'Rango habitual 1991–2020 (10–90 %)','Promedio 1991–2020','2026 (octubre: del 1 al 12)'}, 'TextColor', C.sand, 'Color', 'none', 'EdgeColor', 'none', 'Location', 'northwest');
        src = 'Datos: NOAA OISST v2.1, 24.625°N 112.375°W. Gráfica: Keabelmet.';
    else
        title(ax, 'Sea temperature off Magdalena Bay: 2026 vs. normal', 'Color', C.sand);
        ylabel(ax, '°C');
        legend(ax, {'Typical range 1991–2020 (10–90%)','1991–2020 average','2026 (October: 1st to 12th)'}, 'TextColor', C.sand, 'Color', 'none', 'EdgeColor', 'none', 'Location', 'northwest');
        src = 'Data: NOAA OISST v2.1, 24.625°N 112.375°W. Chart: Keabelmet.';
    end
    footer(f, src, C, F); save(f, out, ['temperatura-2026-' lg]);

    %% 6. La Mancha: clorofila 2015 vs normal
    f = newfig(C); ax = styleax(axes(f), C, F); hold(ax, 'on');
    bar(ax, cl.m, [cl.chl, c15.v], 0.8, 'EdgeColor', 'none');
    ax.ColorOrder = [C.teal; C.coral];
    bb = ax.Children; set(bb(2), 'FaceColor', C.teal); set(bb(1), 'FaceColor', C.coral);
    xticks(ax, 1:12); xticklabels(ax, M); xlim(ax, [0.4 12.6]); ylim(ax, [0 2.1]);
    if es
        title(ax, 'Fitoplancton frente a Bahía Magdalena: 2015 ("La Mancha") contra lo normal', 'Color', C.sand);
        ylabel(ax, 'Clorofila en superficie (mg/m³)');
        legend(ax, {'Mediana 2003–2022','2015'}, 'TextColor', C.sand, 'Color', 'none', 'EdgeColor', 'none', 'Location', 'northeast');
        src = 'Datos: NASA MODIS-Aqua, clorofila mensual (4 km) vía NOAA ERDDAP, 24.4–24.9°N 112.1–112.6°W. Gráfica: Keabelmet.';
    else
        title(ax, 'Phytoplankton off Magdalena Bay: 2015 ("The Blob") vs. normal', 'Color', C.sand);
        ylabel(ax, 'Surface chlorophyll (mg/m³)');
        legend(ax, {'2003–2022 median','2015'}, 'TextColor', C.sand, 'Color', 'none', 'EdgeColor', 'none', 'Location', 'northeast');
        src = 'Data: NASA MODIS-Aqua monthly chlorophyll (4 km) via NOAA ERDDAP, 24.4–24.9°N 112.1–112.6°W. Chart: Keabelmet.';
    end
    footer(f, src, C, F); save(f, out, ['clorofila-2015-' lg]);

    %% 7. Marlines: ataques y capturas (Hansen et al. 2022)
    f = newfig(C); ax = styleax(axes(f), C, F); hold(ax, 'on');
    v = [711 110; 350 58];
    bb = bar(ax, 1:2, v, 0.7, 'EdgeColor', 'none'); set(bb(1), 'FaceColor', C.blue); set(bb(2), 'FaceColor', C.coral);
    for k = 1:2
        text(ax, k-0.14, v(k,1)+25, sprintf('%d', v(k,1)), 'HorizontalAlignment','center','Color',C.sand,'FontName',F,'FontSize',13,'FontWeight','bold');
        text(ax, k+0.14, v(k,2)+25, sprintf('%d', v(k,2)), 'HorizontalAlignment','center','Color',C.sand,'FontName',F,'FontSize',13,'FontWeight','bold');
    end
    xticks(ax, 1:2); xlim(ax, [0.4 2.6]); ylim(ax, [0 820]);
    if es
        xticklabels(ax, {'Nov 2018 · 34 marlines · sardinas','Nov 2019 · 20 marlines · macarelas'});
        title(ax, 'Marlines cazando un cardumen: muchos ataques, pocas capturas', 'Color', C.sand);
        ylabel(ax, 'Número'); legend(ax, {'Ataques','Peces capturados'}, 'TextColor', C.sand, 'Color', 'none', 'EdgeColor', 'none');
        src = 'Datos: Hansen et al. (2022), Communications Biology 5: 1161. Grabaciones a 10–30 km de la costa, frente a Baja California Sur. Gráfica: Keabelmet.';
    else
        xticklabels(ax, {'Nov 2018 · 34 marlin · sardines','Nov 2019 · 20 marlin · mackerel'});
        title(ax, 'Marlin hunting a school: many attacks, few captures', 'Color', C.sand);
        ylabel(ax, 'Count'); legend(ax, {'Attacks','Fish captured'}, 'TextColor', C.sand, 'Color', 'none', 'EdgeColor', 'none');
        src = 'Data: Hansen et al. (2022), Communications Biology 5: 1161. Filmed 10–30 km off Baja California Sur. Chart: Keabelmet.';
    end
    footer(f, src, C, F); save(f, out, ['marlin-ataques-' lg]);
end
disp('OK');

function f = newfig(C, h)
    if nargin < 2; h = 640; end
    f = figure('Visible', 'off', 'Color', C.bg, 'Units', 'pixels', 'Position', [0 0 1200 h]);
end
function ax = styleax(ax, C, F)
    set(ax, 'Color', C.bg, 'XColor', C.dim, 'YColor', C.dim, 'GridColor', C.grid, 'GridAlpha', 0.12, ...
        'FontName', F, 'FontSize', 13, 'Box', 'off', 'TickDir', 'out', 'LineWidth', 0.8);
    grid(ax, 'on'); ax.XGrid = 'off';
    if isa(ax.Parent, 'matlab.ui.Figure'); ax.OuterPosition = [0 0.05 1 0.95]; end
    ax.Title.FontSize = 17; ax.Title.FontWeight = 'bold'; ax.Title.Color = C.sand;
end
function footer(f, s, C, F)
    annotation(f, 'textbox', [0.02 0.0 0.96 0.05], 'String', s, 'Color', C.dim, 'FontName', F, ...
        'FontSize', 10.5, 'EdgeColor', 'none', 'HorizontalAlignment', 'left', 'VerticalAlignment', 'bottom', 'Interpreter', 'none');
end
function save(f, out, name)
    exportgraphics(f, fullfile(out, [name '.svg']), 'ContentType', 'vector', 'BackgroundColor', f.Color);
    close(f);
end
